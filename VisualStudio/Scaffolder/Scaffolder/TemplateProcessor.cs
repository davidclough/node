using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;

namespace Scaffolder
{
    public class TemplateProcessor
    {
        private readonly TemplateData _templateData;

        public TemplateProcessor(TemplateData templateData)
        {
            _templateData = templateData;
        }

        public void CopyTemplateToNewLocationAndReplacePlaceholders()
        {
            //string templateFolderName = String.Format("{0} {1} ({2:d MMM, H-mm-ss})", 
            string templateFolderName = String.Format("C:\\Temp\\{0} {1} ({2:d MMM, H-mm-ss})",
                                                      _templateData.EntityNamePascalCase,
                                                      _templateData.TemplateName,
                                                      DateTime.Now);

            string relativeTemplateFolderPath = String.Format("Templates\\{0}", _templateData.TemplateName);
            ProcessTemplateFolder(relativeTemplateFolderPath, templateFolderName);
        }

        private void ProcessTemplateFolder(string sourceFolderPath, string targetFolderPath)
        {
            DirectoryInfo sourceDirectoryInfo = new DirectoryInfo(sourceFolderPath);
            DirectoryInfo targetDirectoryInfo = Directory.CreateDirectory(targetFolderPath);
            ProcessFolder(sourceDirectoryInfo, targetDirectoryInfo);
        }

        private void ProcessFolder(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (FileInfo file in source.GetFiles())
            {
                string targetPath = Path.Combine(target.FullName, file.Name.Replace(PlaceholderNames.Entity, _templateData.EntityNamePascalCase));
                string fileContents = File.ReadAllText(file.FullName);
                string processedFileContents = ProcessContents(fileContents);

                if (file.Name.Contains(PlaceholderNames.MigrationTimeStamp))
                {
                    var currentUnixTimeStamp = DateAndTime.GetUnixTimeStamp().ToString();
                    targetPath = targetPath.Replace(PlaceholderNames.MigrationTimeStamp, currentUnixTimeStamp);
                    processedFileContents = processedFileContents.Replace(PlaceholderNames.MigrationTimeStamp, currentUnixTimeStamp);
                }

                File.WriteAllText(targetPath, processedFileContents);
            }

            foreach (DirectoryInfo dir in source.GetDirectories())
            {
                string targetFolderPath =
                    dir.Name.Replace(PlaceholderNames.Entity, _templateData.EntityNamePascalCase)
                            .Replace(PlaceholderNames.VersionMigrationFolderName, _templateData.VersionMigrationFolderName);

                ProcessFolder(dir, target.CreateSubdirectory(targetFolderPath));
            }
        }

        public string ProcessContents(string fileContents)
        {
            string processedContents = fileContents;

            processedContents = processedContents.Replace(PlaceholderNames.Entity, _templateData.EntityNamePascalCase);
            processedContents = processedContents.Replace(PlaceholderNames.EntityCamelCase, _templateData.EntityNameCamelCase);
            processedContents = processedContents.Replace(PlaceholderNames.VersionMigrationNamespace, _templateData.VersionMigrationNamespace);
            processedContents = processedContents.Replace(PlaceholderNames.SolutionNamespace, _templateData.SolutionNamespace);
            processedContents = ProcessPropertiesForEachPropertyRegex(processedContents);
            processedContents = ReplaceEachNewGuidPlaceholderWithDifferentGuid(processedContents);

            return processedContents;
        }

        public string ProcessPropertiesForEachPropertyRegex(string fileContents)
        {
            string processedContents = fileContents;

            processedContents = ProcessProperties(processedContents, PlaceholderNames.ForEachPropertyRegex);
            processedContents = ProcessProperties(processedContents, PlaceholderNames.ForEachPropertyAddFinalSemiColonRegex);
            processedContents = ProcessProperties(processedContents, PlaceholderNames.ForEachPropertyRemoveFinalCommaRegex);

            return processedContents;
        }

        public string ProcessProperties(string fileContents, string forEachRegex)
        {
            string processedContents = fileContents;
            MatchCollection matches = Regex.Matches(fileContents, forEachRegex, RegexOptions.Singleline);
            foreach (Match match in matches)
            {
                string[] lines = Regex.Split(match.Value, "\r\n|\r|\n|\n\r");

                // NOTE: The algorithm expects the template to match at least three lines.
                //       The first contains the "{{INSTRUCTION:" and the last contains the closing "}}". These lines are not intended
                //       to be contained in the result.
                //       We will leave the instruction placeholder in place if the above is not the case to give an obvious indication of error.
                var replacementLines = new List<string>();
                if (lines.Length > 2)
                {
                    foreach (PropertyData propertyData in _templateData.Properties)
                    {
                        foreach (string line in lines.Skip(1).Take(lines.Length - 2))
                        {
                            replacementLines.Add(line.Replace("PropertyName", propertyData.PropertyName)
                                                     .Replace("FluentMigratorTypeInstruction", propertyData.FluentMigratorTypeInstruction)
                                                     .Replace("PropertType", propertyData.PropertyType));
                        }
                    }

                    string replacementText = String.Join(Environment.NewLine, replacementLines);

                    if (forEachRegex == PlaceholderNames.ForEachPropertyAddFinalSemiColonRegex)
                    {
                        replacementText = replacementText + ";";
                    }

                    if (forEachRegex == PlaceholderNames.ForEachPropertyRemoveFinalCommaRegex)
                    {
                        replacementText = replacementText.Substring(replacementText.Length - 1);
                    }

                    processedContents = processedContents.Replace(match.Value, replacementText);
                }
            }

            return processedContents;
        }

        private string ReplaceEachNewGuidPlaceholderWithDifferentGuid(string fileContents)
        {
            string processedContents = fileContents;

            var guidPlaceholderRegex = new Regex(PlaceholderNames.NewGuid);
            int guidPlaceholdersCount = guidPlaceholderRegex.Matches(processedContents).Count;
            for (int i = 0; i < guidPlaceholdersCount; i++)
            {
                processedContents = guidPlaceholderRegex.Replace(processedContents, Guid.NewGuid().ToString(), 1);
            }

            return processedContents;
        }
    }
}
