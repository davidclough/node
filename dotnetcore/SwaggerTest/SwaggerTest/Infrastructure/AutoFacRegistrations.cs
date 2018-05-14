using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Autofac;

namespace SwaggerTest.Infrastructure
{
    /// <summary>
    /// See http://autofaccn.readthedocs.io/en/latest/register/scanning.html for more help.
    /// </summary>
    public static class AutofacRegistrations
    {
        public static void AutoRegisterCertainTypes(this ContainerBuilder containerBuilder)
        {
            var repositoryAssembly = Assembly.GetExecutingAssembly();
            containerBuilder.AutoRegisterTypesEndingWith("Repository", repositoryAssembly);

            var businessAssembly = Assembly.GetExecutingAssembly();
            containerBuilder.AutoRegisterTypesEndingWith("Business", businessAssembly);
        }

        public static void AutoRegisterTypesEndingWith(this ContainerBuilder containerBuilder, string endingWithCharacters, Assembly fromAssembly)
        {
            containerBuilder.RegisterAssemblyTypes(fromAssembly)
                            .Where(t => t.Name.EndsWith(endingWithCharacters))
                            .AsImplementedInterfaces()
                            ////.SingleInstance();      // Single instance even for multiple requests.
                            .InstancePerLifetimeScope();
        }
    }
}
