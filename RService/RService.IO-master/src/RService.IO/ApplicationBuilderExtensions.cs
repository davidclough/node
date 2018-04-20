﻿using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using RService.IO.Router;

namespace RService.IO
{
    public static class ApplicationBuilderExtensions
    {
        private static readonly Action<IRouteBuilder> EmptyRouteConfigure = builder => { };

        public static IApplicationBuilder UseRServiceIo(this IApplicationBuilder builder)
        {
            return builder.UseRServiceIo(EmptyRouteConfigure);
        }

        public static IApplicationBuilder UseRServiceIo(
            this IApplicationBuilder builder, 
            Action<IRouteBuilder> configureRoutes)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            if (configureRoutes == null)
                throw new ArgumentNullException(nameof(configureRoutes));

            var service = builder.ApplicationServices.GetService<RService>();

            var routes = new RouteBuilder(builder);

            foreach (var route in service.Routes)
            {
                routes.MapRServiceIoRoute(route.Value.Route, RServiceTagHandler.Tag);
            }

            configureRoutes(routes);

            builder.UseMiddleware<RServiceRouterMiddleware>(routes.Build());
            return builder.UseMiddleware<RServiceMiddleware>();
        }
    }
}