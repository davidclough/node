using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Newtonsoft.Json;

namespace Scaffolder
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var templateData = GetTemplateDataFromFile("TemplateData.json");
            //var templateData = ConstructTemplateDataFile();

            var templateProcessor = new TemplateProcessor(templateData);
            templateProcessor.CopyTemplateToNewLocationAndReplacePlaceholders();

            // TODO: Check if any of the files which need to be modified have a custom namespace that is relevant to the specific solution.
            // TODO: Go through all required template files and see if can find and REPLACE MENT PATTERNS that have not been covered.

            // TODO: {{MIGRATION_TIME_STAMP+001}} - need a way for the order of the migrations to be specified.
            //          1) A migration may depend on entities added/modified by a previous new script
            //          2) If the program run really quickly we may end up with multiple scripts that have the same time stamp.
            // TODO: {{API_VERSION_NUMBER}} - Another TemplateData field for folders and namespaces containing V1...
        }

        private static TemplateData GetTemplateDataFromFile(string filePath)
        {
            string fileContents = File.ReadAllText(filePath);
            var templateData = JsonConvert.DeserializeObject<TemplateData>(fileContents);
            templateData.PopulatePropertyTypesFromDbFieldTypes();
            return templateData;
        }

        private static TemplateData ConstructTemplateDataFile()
        {
            var templateData = new TemplateData
            {
                TemplateName = "TestTemplate",
                EntityNamePascalCase = "WashingMachine",
                SolutionNamespace = "BozzerBox",
                NextAssemblyVersionToBePublished = "1.14.3",
                ApiVersionNumber = 2,
                Properties = new[]
                {
                    new PropertyData { PropertyName = "ModelName", FluentMigratorTypeInstruction = "AsString(255).NotNullable()" },
                    new PropertyData { PropertyName = "HasDryer", FluentMigratorTypeInstruction = "AsBoolean.Nullable()" },
                }
            };

            File.WriteAllText("WashingMachine.json", JsonConvert.SerializeObject(templateData, Formatting.Indented));

            return templateData;
        }
    }
}
