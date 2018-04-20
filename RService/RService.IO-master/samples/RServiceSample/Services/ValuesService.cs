using RService.IO.Abstractions;
using System.Collections.Generic;
using RServiceSample.Models;

namespace RServiceSample.Services
{
    public class ValuesService : ServiceBase
    {
        [Route("api/Values", RestVerbs.Get)]
        public IEnumerable<string> Get123()
        {
            return new[] { "value1", "value2" };
        }

        [Route("api/more-values", RestVerbs.Get)]
        public IEnumerable<string> Get456()
        {
            return new[] { "value11", "value12", "value21", "value22" };
        }

        public string Get(GetItemValueReq req)
        {
            return "value";
        }

        public void Post(AddItemValueReq req)
        {
        }

        public void Put(UpdateItemValueReq req)
        {
        }

        public void Delete(RemoveItemValueReq req)
        {
        }
    }
}
