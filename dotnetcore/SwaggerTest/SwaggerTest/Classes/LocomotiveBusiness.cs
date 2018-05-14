using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SwaggerTest.Interfaces;

namespace SwaggerTest.Classes
{
    public class LocomotiveBusiness : ILocomotiveBusiness
    {
        private readonly IChannelRepository _channelRepository;

        public LocomotiveBusiness(IChannelRepository channelRepository)
        {
            _channelRepository = channelRepository;
        }

        public IEnumerable<decimal> GetLocomotiveInfo()
        {
            // Checking if this matches the value return in the same call but from LocomotivesController.
            // The experiment revealed they are different instances.
            var aaa = _channelRepository.ChannelRepositoryId;

            return _channelRepository.GetChannelDataPoints(12345);
        }
    }
}
