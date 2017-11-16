using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Scaffolder;

namespace ScaffolderTests
{
    [TestClass]
    public class StringUtilitiesTests
    {
        [TestMethod]
        public void EntityNameCamelCase_ProducesCamelCase()
        {
            string camelCase = "WashingMachine".ToCamelCase();

            Assert.AreEqual("washingMachine", camelCase);
        }
    }
}
