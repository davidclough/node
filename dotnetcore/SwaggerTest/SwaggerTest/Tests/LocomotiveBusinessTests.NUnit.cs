using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using SwaggerTest.Classes;
using SwaggerTest.Interfaces;

namespace SwaggerTest.Tests
{
    [TestFixture]
    public class LocomotiveBusinessTestsN
    {
        [Test]
        public void InitialTest_N()
        {
            var mockChannelRepository = new Mock<IChannelRepository>();
            mockChannelRepository.Setup(x => x.GetChannelDataPoints(It.IsAny<int>())).Returns(new[] { 1m, 2m, 3m });
            var locomotiveBusiness = new LocomotiveBusiness(mockChannelRepository.Object);

            var dataPoints = locomotiveBusiness.GetLocomotiveInfo()
                                               .ToList();

            Assert.AreEqual(1m, dataPoints[0]);
            Assert.AreEqual(2m, dataPoints[1]);
            Assert.AreEqual(3m, dataPoints[2]);
        }
    }
}
