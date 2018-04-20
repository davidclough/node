using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CoreCmdTest
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddScoped//.AddTransient//.AddSingleton
            services.AddScoped<IGreeter, Greeter>();
        }

        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            IGreeter greeter)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // DC: This is an example of one piece of middleware. Other generally start app.Use...()
            app.Run(async (context) =>
            {
                throw new Exception("Errorio");

                var greeting = greeter.GetMessageOfTheDay();
                await context.Response.WriteAsync(greeting);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // public void Configure2(
        //     IApplicationBuilder app,
        //     IHostingEnvironment env,

        //     IGreeter greeter,
        //     ILogger<Startup> logger)
        // {
        //     if (env.IsDevelopment())
        //     {
        //         app.UseDeveloperExceptionPage();
        //     }

        //     // Slightly lower lever definition of middleware.
        //     app.Use(next =>
        //     {
        //         // NOTE: This is the actual middleware.
        //         return async context =>
        //         {
        //             logger.LogInformation("Request incoming");
        //             if (context.Request.Path.StartsWithSegments("/mym"))
        //             {
        //                 await context.Response.WriteAsync("Hit!!");
        //                 logger.LogInformation("Request handled QWERTY");
        //             }
        //             else
        //             {
        //                 await next(context);        // Move on to next piece of middleware
        //                 logger.LogInformation("Request outgoing 12345");
        //             }
        //         };
        //     });

        //     // The order in which middleware is called is important.
        //     //app.UseWelcomePage();
        //     app.UseWelcomePage(new WelcomePageOptions { Path = "/wp" });

        //     // DC: This is an example of one piece of middleware. Other generally start app.Use...()
        //     app.Run(async (context) =>
        //     {
        //         var greeting = greeter.GetMessageOfTheDay();
        //         await context.Response.WriteAsync(greeting);
        //     });
        // }

        // public void Configure1(
        //     IApplicationBuilder app,
        //     IHostingEnvironment env,
        //     IConfiguration configuration)
        // {
        //     if (env.IsDevelopment())
        //     {
        //         app.UseDeveloperExceptionPage();
        //     }

        //     app.Run(async (context) =>
        //     {
        //         var greeting = configuration["Greeting"];
        //         await context.Response.WriteAsync(greeting);
        //     });
        // }
    }
}
