<Query Kind="Program" />

void Main()
{
	string[] originalLinks =
	{
		"[text](http://abc.com)",
		"[description](http://def.com)",
	};
	
	var newLinks = originalLinks.Select(s => GenerateAnchorLinkWithTargetBlank(s));
	
	//originalLinks.Dump();
	newLinks.Dump();
}

private string GenerateAnchorLinkWithTargetBlank(string markdownLink)
{
	var match = Regex.Match(markdownLink, @"\[(?<text>.+)\]\((?<url>.+)\)");
	if (match.Success)
	{
		var newMarkup = String.Format("<a href=\"{0}\" target=\"_blank\">{1}</a>",
									  match.Groups["url"].Captures[0].Value,
									  match.Groups["text"].Captures[0].Value);
		return newMarkup;
	}
	return "CANNOT CONVERT";
}

