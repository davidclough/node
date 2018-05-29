using System;
using System.Linq;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Interfaces.Controllers;
using Abc.Container;

namespace Xyz.WebApi
{
    public static class AutoFacConfig
    {
        /// <summary>
        /// Register Components for Autofac Configuration
        /// </summary>
        public static void RegisterComponents()
        {
            var builder = AutoFacConfiguration.WebApiBuilder;
            builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);
            RegisterApiVersions(builder);

            var container = AutoFacConfiguration.WebApiContainer;
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }


        private static void RegisterApiVersions(ContainerBuilder builder)
        {
            var controllerAssemblies = AppDomain.CurrentDomain
                                                .GetAssemblies()
                                                .Where(x => !x.GlobalAssemblyCache && x.FullName.Contains("Controller.V"))
                                                .SelectMany(x => x.GetTypes())
                                                .Where(x => x.IsClass && !x.IsAbstract && x.IsSubclassOf(typeof(ApiController)))
                                                .Select(x => x.Assembly)
                                                .Distinct();

            var interfaceType = typeof(ITestControllerInterface);

            var types = controllerAssemblies.SelectMany(x => x.GetTypes()).Where(x => interfaceType.IsAssignableFrom(x));

            foreach (var type in types)
            {
                var test = (ITestControllerInterface)Activator.CreateInstance(type);
                test.Configure(builder);
            }

            builder.RegisterApiControllers(controllerAssemblies.ToArray());
        }
    }
}