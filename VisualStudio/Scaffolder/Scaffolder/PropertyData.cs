using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public class PropertyData
    {
        public string PropertyName { get; set; }

        /// <summary>
        /// This does not include the '.WithColumn("col_name")' but but any further method calls for that column, excluding the initial '.'
        ///                                                                                  e.g. 'AsString(255).NotNullable()'.
        /// </summary>
        public string FluentMigratorTypeInstruction { get; set; }

        public string PropertyType { get; set; }

        /// <summary>
        /// Note that it may be a string here but this value will only be used to replace the placeholder text in any template.
        /// For example, "3" in here will end up being the value 3 if the PropertyType i "int".
        /// NOTE: Ensure surrounding quotes are included if the PropertyType is string, e.g. "\"test string\"".
        /// </summary>
        public string MappingTestValue { get; set; }

        public void PopulatePropertyTypeFromDbFieldType()
        {
            if (FluentMigratorTypeInstruction.StartsWith("AsString") || FluentMigratorTypeInstruction.StartsWith("AsMaxString"))
            {
                PropertyType = "string";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsBoolean"))
            {
                PropertyType = "bool";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsInt32"))
            {
                PropertyType = "int";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsDate"))
            {
                PropertyType = "DateTime";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsCurrency") ||
                     FluentMigratorTypeInstruction.StartsWith("AsDecimal") ||
                FluentMigratorTypeInstruction.StartsWith("AsDouble"))
            {
                PropertyType = "decimal";
            }
            else
            {
                throw new ApplicationException(String.Format("FluentMigratorTypeInstruction not recognized: {0)", FluentMigratorTypeInstruction));
            }

            if (PropertyType != "string" && FluentMigratorTypeInstruction.Contains(".Nullable()"))
            {
                PropertyType += "?";
            }
        }
    }
}
