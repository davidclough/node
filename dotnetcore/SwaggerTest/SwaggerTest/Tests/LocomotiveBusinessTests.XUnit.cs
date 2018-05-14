using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using SwaggerTest.Classes;
using SwaggerTest.Interfaces;
using Xunit;

namespace SwaggerTest.Tests
{
    public class LocomotiveBusinessTestsX
    {
        // NOTE: Had to add latest version of "xunit.runner.visualstudio" to be able to run from TestExplorer.
        //       NUnit test in the other class will probably need a similar runner package instaling for NUnit.
        // NOTE: After that I had to add the GenerateProgramFile false tag to the project file to prevent VS from auto generating ANOTHER program.cs file 
        //       on the fly(since we already have one with this being a .NET Core Web API project).
        //       This is only because I have added tests to the Web API project itself, rather than within a separate assembly.
        //      <PropertyGroup>
        //        <TargetFramework>netcoreapp2.0</TargetFramework>
        //    **    <GenerateProgramFile>false</GenerateProgramFile>
        //      </PropertyGroup>

        // OBSERVATION: In a separate test project I had to add "xunit.runner.utility (v2.2.0)" NuGet package at the instruction of NCrunch.
        //              Howwever, I did not have to do that in this project for it to work.

        // NOTE: For running tests via ReSharper I needed to install version 2018.1.

        [Fact]
        public void InitialTest_X()
        {
            var mockChannelRepository = new Mock<IChannelRepository>();
            mockChannelRepository.Setup(x => x.GetChannelDataPoints(It.IsAny <int>())).Returns(new[] { 1m, 2m, 3m });
            var locomotiveBusiness = new LocomotiveBusiness(mockChannelRepository.Object);

            var dataPoints = locomotiveBusiness.GetLocomotiveInfo()
                                               .ToList();

            Assert.Equal(1m, dataPoints[0]);
            Assert.Equal(2m, dataPoints[1]);
            Assert.Equal(3m, dataPoints[2]);
        }
    }
}
