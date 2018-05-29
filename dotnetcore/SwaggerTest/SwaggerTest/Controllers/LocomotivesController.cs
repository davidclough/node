using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SwaggerTest.Interfaces;
using SwaggerTest.Classes;

namespace SwaggerTest.Controllers
{
    /// <inheritdoc>
    /// Test for data channels in RDD.
    /// NOTE: Even when we did not derive from any class basic end points worked.
    /// However, ControllerBase) adds things like HttpContext property.
    /// Controller is what appears in the default when create project and select Web API.
    /// I think this is more MVC specific (it adds things like ViewBag) but we are allowed to mix MVC and Web API within same controller now.
    /// https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller?view=aspnetcore-2.1
    /// 
    /// OBSERVATION: Selecting "Web App" when creating a project did not provide much. There were no controllers, the cshtml files just had static razor content
    ///              and they even preferred using the MVC 2 ViewData instead of ViewBag.
    /// </inheritdoc>
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class LocomotivesController : Controller
    {
        private readonly ILocomotiveBusiness _locomotiveBusiness;
        private readonly IChannelRepository _channelRepository;

        public LocomotivesController(ILocomotiveBusiness locomotiveBusiness, IChannelRepository channelRepository)
        {
            _locomotiveBusiness = locomotiveBusiness;
            _channelRepository = channelRepository;
        }

        /// <summary>
        /// LATER: You have to check "XML documentation File" option in the Build tab of project properties. Then method comments will appear in Swagger.
        /// </summary>
        /// <returns></returns>
        ////[Produces("application/json")]
        [HttpGet]
        public IEnumerable<decimal> Get()
        {
            // Checking if this matches the value return in the same call but from LocomotiveBusiness.
            // The experiment revealed they are different instances.
            var aaa = _channelRepository.ChannelRepositoryId;

            var locomotiveInfo = _locomotiveBusiness.GetLocomotiveInfo();
            return locomotiveInfo;
        }
    }
}
