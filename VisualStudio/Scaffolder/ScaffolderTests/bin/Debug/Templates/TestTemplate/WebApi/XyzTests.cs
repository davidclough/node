using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder.Templates.TestTemplate.WebApi
{
    public class XyzTests
    {
        [Test]
        public void BasicTest()
        {
            var xyz = new Xyz
            {
{{FOR_EACH_PROPERTY:
                PropertyName = MappingTestValue,
}}
            };

{{FOR_EACH_PROPERTY:
            Assert.AreEqual(MappingTestValue, xyz.PropertyName);
}}
            // Total number of properties to assert for is: {{PROPERTY_COUNT}}
        }
    }
}
