using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Scaffolder;

namespace ScaffolderTests
{
    [TestClass]
    public class TemplateDataTests
    {
        [TestMethod]
        public void VersionNumberMigrationNamespace_ProducesExpectedResult()
        {
            var templateData = new TemplateData { NextAssemblyVersionToBePublished = "2.13.0" };

            var expectedResult = "_002._013._000";
            Assert.AreEqual(expectedResult, templateData.VersionMigrationNamespace);
        }

        [TestMethod]
        public void VersionNumberMigrationFolderName_ProducesExpectedResult()
        {
            var templateData = new TemplateData { NextAssemblyVersionToBePublished = "2.13.0" };

            var expectedResult = "002.013.000";
            Assert.AreEqual(expectedResult, templateData.VersionMigrationFolderName);
        }
    }
}
