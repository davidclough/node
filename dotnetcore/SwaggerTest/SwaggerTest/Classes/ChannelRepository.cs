using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SwaggerTest.Interfaces;

namespace SwaggerTest.Classes
{
    public class ChannelRepository : IChannelRepository
    {
        private readonly Random _random = new Random();

        public int ChannelRepositoryId { get; }

        public ChannelRepository()
        {
            ChannelRepositoryId = _random.Next(10000);
        }

        public IEnumerable<decimal> GetChannelDataPoints(int channelNumber)
        {
            var channelDataPoints = new List<decimal>();
            int numberOfPoints = _random.Next(20) + 1;
            for (int i = 0; i < numberOfPoints; i++)
            {
                channelDataPoints.Add((decimal)_random.NextDouble() * 200);
            }

            return channelDataPoints;
        }
    }
}
