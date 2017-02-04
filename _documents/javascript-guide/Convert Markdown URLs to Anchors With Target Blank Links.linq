<Query Kind="Program" />

void Main()
{
	string text = "text";
	string url = "http://abc.com";
	var original = String.Format("[{0}]({1})", text, url);
	
	var match = Regex.Match(original, @"\[(?<text>.+)\]\((?<url>.+)\)");
	if (match.Success)
	{
		var newMarkup = String.Format("<a href=\"{0}\" target=\"_blank\">{1}</a>",
									  match.Groups["url"].Captures[0].Value,
									  match.Groups["text"].Captures[0].Value);
		
		original.Dump();
		newMarkup.Dump();
	}
}

