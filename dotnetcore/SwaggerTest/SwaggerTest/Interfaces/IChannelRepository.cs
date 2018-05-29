using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwaggerTest.Interfaces
{
    public interface IChannelRepository
    {
        IEnumerable<decimal> GetChannelDataPoints(int channelNumber);
        int ChannelRepositoryId { get; }
    }
}
