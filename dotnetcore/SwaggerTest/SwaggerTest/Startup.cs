using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NJsonSchema;
using NSwag.AspNetCore;
using SwaggerTest.Infrastructure;
using SwaggerTest.Classes;

namespace SwaggerTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }



        // DEFAULT .NET Core version:
        // This method gets called by the runtime. Use this method to add services to the container.
        ////public void ConfigureServices(IServiceCollection services)
        ////{
        ////    services.AddMvc();

        ////    // THIS (injected into ValuesController) WORKED.
        ////    services.AddTransient<IUtility, Utility>();
        ////}

            // MODIFIED according to instructions on:
        // http://www.codedigest.com/posts/49/using-autofac-instead-of-inbuilt-di-container-with-in-aspnet-core-mvc
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // DC: I had problems requesting a call from a different localhost port in my UI test application.
            // HELP: https://weblog.west-wind.com/posts/2016/Sep/26/ASPNET-Core-and-CORS-Gotchas
            //       He also indicated that it should go before the UseMvc(), although that is in Configure()!
            services.AddCors(x => x.AddPolicy("CorsPolicy", corsPolicy =>
            {
                // OBSERVATION: This overcomes the problem.
                //              I did not see the Access-Control-Allow-Origin header in the response in Fiddler but DID see it in browser development tools.
                corsPolicy.AllowAnyOrigin()
                          //.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
            }));

            // This bit same as normal.
            services.AddMvc();

            //Now register our services with Autofac container
            var builder = new ContainerBuilder();

            //builder.RegisterType<Utility>().As<IUtility>().InstancePerRequest();  // FAILURE - DO NOT KNOW WHY.
            builder.RegisterType<Utility>().As<IUtility>();                       // SUCCESS
                                                                                  //builder.RegisterType<Utility>();                                      // FAILURE - this may be because of fluent style. It may not be the case that the engine autmatically looks for an interface of the same name.

            //builder.RegisterType<LocomotiveBusiness>().AsImplementedInterfaces();   // SUCCESS - This results in AUTOMATIC registration.
            // ERROR MESSAGE: DependencyResolutionException: Unable to resolve the type 'SwaggerTest.Classes.LocomotiveBusiness' because the lifetime 
            //                scope it belongs in can't be located.
            //builder.RegisterType<LocomotiveBusiness>().AsImplementedInterfaces().InstancePerRequest();   // FAILURE
            //builder.RegisterType<ChannelRepository>().AsImplementedInterfaces();
            builder.AutoRegisterCertainTypes();
            // NOTE: This link specifies that PerRequest is not valid within .NET Core:
            //       http://autofaccn.readthedocs.io/en/latest/faq/per-request-scope.html
            //       http://autofaccn.readthedocs.io/en/latest/integration/aspnetcore.html

            builder.Populate(services);
            var container = builder.Build();
            //Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(container);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            // Code added to make use of NSwag.AspNetCore.
            // http://localhost:57112/api/values
            // http://localhost:57112/swagger
            app.UseStaticFiles();
            app.UseSwaggerUi(typeof(Startup).GetTypeInfo().Assembly, settings =>
            {
                settings.GeneratorSettings.DefaultPropertyNameHandling = PropertyNameHandling.CamelCase;
                settings.GeneratorSettings.Title = "Badgeonkied";
            });
            // NSwag: https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-nswag?view=aspnetcore-2.1&tabs=visual-studio%2Cvisual-studio-xml
            //        https://github.com/RSuter/NSwag/issues/869
            //        https://github.com/RSuter/NSwag   // Seems to show a lot of information in the README.
            // SWASHBUCKLE: This maybe looks more complete and have used it before.
            //              https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-2.1&tabs=visual-studio%2Cvisual-studio-xml


            app.UseMvc();
        }
    }
}
