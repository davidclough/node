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
