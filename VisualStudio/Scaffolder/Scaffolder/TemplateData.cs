using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public class TemplateData
    {
        public string TemplateName { get; set; }
        public string EntityNamePascalCase { get; set; }
        public string SolutionNamespace { get; set; }
        public string NextAssemblyVersionToBePublished { get; set; }
        public int ApiVersionNumber { get; set; }
        public string TargetSolutionPath { get; set; }

        /// <summary>
        /// Used in comjunction with Properties to determine the total number of properties to assert for in a mapping test.
        /// In the initial template being constructed there are 6: XyzId, IsDeleted and the 4 created/modified properties.
        /// NOTE: Do not use the default value for the property type, e.g. use true for bools rather than false just to make sure
        ///       a test assertion isn't "correct by accident".
        /// </summary>
        public int NumberOfStandardProperties { get; set; }

        /// <summary>
        /// NOTE: These properties should not include the default properties which are always included and which should be catered for in a
        ///       non-automated way, with specific lines in each template catering for them.
        ///       Currently there are 6 default properties which should not be in this list:
        ///         XyzId   (the primary key)
        ///         CreatedDateTime, CreatedByUserId, ModifiedDateTime, ModifiedByUserId
        ///         IsDeleted
        /// </summary>
        public IEnumerable<PropertyData> Properties { get; set; }

        private string _entityNameCamelCase;
        public string EntityNameCamelCase
        {
            get
            {
                return _entityNameCamelCase ?? (_entityNameCamelCase = EntityNamePascalCase.ToCamelCase());
            }
        }

        // Example: _001._004._000
        public string VersionMigrationNamespace
        {
            get
            {
                IEnumerable<int> numbers = ParseVersionStringIntoNumbers(NextAssemblyVersionToBePublished);
                string migrationNamespace = String.Join(".", numbers.Select(x => String.Format("_{0:000}", x)));
                return migrationNamespace;
            }
        }

        // Example: 001.004.000
        public string VersionMigrationFolderName
        {
            get
            {
                IEnumerable<int> numbers = ParseVersionStringIntoNumbers(NextAssemblyVersionToBePublished);
                string migrationNamespace = String.Join(".", numbers.Select(x => String.Format("{0:000}", x)));
                return migrationNamespace;
            }
        }

        public string ApiVersion
        {
            get
            {
                return String.Format("V{0}", ApiVersionNumber);
            }
        }

        public int CustomPropertyCount
        {
            get
            {
                return Properties.Count();
            }
        }

        public int PropertyCount
        {
            get
            {
                return NumberOfStandardProperties + Properties.Count();
            }
        }

        private IEnumerable<int> ParseVersionStringIntoNumbers(string version)
        {
            IEnumerable<int> numbers = version
                                        .Split('.')
                                        // If they haven't used numbers only we will rightly get an exception.
                                        .Select(x => Int32.Parse(x));
            return numbers;
        }

        public void PopulatePropertyTypesFromDbFieldTypes()
        {
            foreach (PropertyData property in Properties)
            {
                property.PopulatePropertyTypeFromDbFieldType();
            }
        }
    }
}
