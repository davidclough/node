using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RService.IO.Abstractions;
using RServiceSample.Models;

namespace RServiceSample.Services
{
    public class QwertyService : ServiceBase
    {
        private const string RelativeControllerRoute = "qwerty";

        //[Route("api/" + RelativeControllerRoute, RestVerbs.Get)]
        //public IEnumerable<string> Get123()
        //{
        //    return new[] { "value1", "value2" };
        //}

        //[Route("api/" + RelativeControllerRoute, RestVerbs.Post)]
        //public void Add(AddQwerty model)
        //{
        //}
    }
}
