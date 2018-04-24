﻿using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace RService.IO.Abstractions
{
    public static class RoutingHttpContextExtensions
    {
        public static RequestDelegate GetRouteHandler(this HttpContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            var routingFeature = context.Features[typeof(IRoutingFeature)] as RoutingFeature;
            return routingFeature?.RouteHandler;
        }
    }
}