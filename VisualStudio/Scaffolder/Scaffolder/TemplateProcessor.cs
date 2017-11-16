﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;

namespace Scaffolder
{
    public class TemplateProcessor
    {
        private const string EntityPlaceholderName = "Xyz";
        private readonly string EntityPlaceHolderNameCamelCase;

        private const string TemplateRegexFormat = "{{INSTRUCTION:.+?}}";
        private readonly string ForEachPropertyRegex = TemplateRegexFormat.Replace("INSTRUCTION", "FOR_EACH_PROPERTY");
        private readonly string ForEachPropertyAddFinalSemiColonRegex = TemplateRegexFormat.Replace("INSTRUCTION", "FOR_EACH_PROPERTY_ADD_FINAL_SEMI_COLON");
        private readonly string ForEachPropertyRemoveFinalCommaRegex = TemplateRegexFormat.Replace("INSTRUCTION", "FOR_EACH_PROPERTY_REMOVE_FINAL_COMMA");

        private TemplateData _templateData;

        public TemplateProcessor(TemplateData templateData)
        {
            _templateData = templateData;
            EntityPlaceHolderNameCamelCase = EntityPlaceholderName.ToCamelCase();
        }

        public void CopyTemplateToNewLocation()
        {
            string templateFolderName = String.Format("{0} Template ({1:d MMM, H-mm-ss})", _templateData.EntityNamePascalCase, DateTime.Now);
            ProcessTemplateFolder("Template", templateFolderName);
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
                string targetPath = Path.Combine(target.FullName, file.Name.Replace(EntityPlaceholderName, _templateData.EntityNamePascalCase));
                string fileContents = File.ReadAllText(file.FullName);
                string processedFileContents = ProcessContents(fileContents);
                File.WriteAllText(targetPath, processedFileContents);
            }

            foreach (DirectoryInfo dir in source.GetDirectories())
            {
                ProcessFolder(dir, target.CreateSubdirectory(dir.Name.Replace(EntityPlaceholderName, _templateData.EntityNamePascalCase)));
            }
        }

        public string ProcessContents(string fileContents)
        {
            string processedContents = fileContents;
            processedContents = processedContents.Replace(EntityPlaceholderName, _templateData.EntityNamePascalCase);
            processedContents = processedContents.Replace(EntityPlaceHolderNameCamelCase, _templateData.EntityNameCamelCase);
            processedContents = ProcessPropertiesForEachPropertyRegex(processedContents);
            return processedContents;
        }

        public string ProcessPropertiesForEachPropertyRegex(string fileContents)
        {
            string processedContents = fileContents;
            processedContents = ProcessProperties(processedContents, ForEachPropertyRegex);
            processedContents = ProcessProperties(processedContents, ForEachPropertyAddFinalSemiColonRegex);
            processedContents = ProcessProperties(processedContents, ForEachPropertyRemoveFinalCommaRegex);
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
                                                     .Replace("DbFieldType", propertyData.DbFieldType)
                                                     .Replace("PropertType", propertyData.PropertyType));
                        }
                    }

                    string replacementText = String.Join(Environment.NewLine, replacementLines);

                    if (forEachRegex == ForEachPropertyAddFinalSemiColonRegex)
                    {
                        replacementText = replacementText + ";";
                    }

                    if (forEachRegex == ForEachPropertyRemoveFinalCommaRegex)
                    {
                        replacementText = replacementText.Substring(replacementText.Length - 1);
                    }

                    processedContents = processedContents.Replace(match.Value, replacementText);
                }
            }

            return processedContents;
        }
    }
}