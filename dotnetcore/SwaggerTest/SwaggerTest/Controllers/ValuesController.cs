using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SwaggerTest.Classes;

namespace SwaggerTest.Controllers
{
    /// <inheritdoc>
    /// This is my ValuesController. http://tunnelvisionlabs.github.io/SHFB/docs-master/SandcastleBuilder/html/79897974-ffc9-4b84-91a5-e50c66a0221d.htm
    /// Swagger still seems to ignore this comment, although I would expect it is in the generated XML file.
    /// </inheritdoc>
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class ValuesController : Controller
    {
        private readonly IUtility _utility;

        public ValuesController(IUtility utility)
        {
            _utility = utility;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _utility.GetSomeValues();
            //return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
