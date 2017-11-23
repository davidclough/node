using System;

public class XyzModule
{
    private string _xyz = "Xyz";

{{FOR_EACH_PROPERTY:
    public PropertyType PropertyName { get; set; }
}}

{{FOR_EACH_PROPERTY_ADD_FINAL_SEMI_COLON:
    public PropertyType PropertyNameProxy { get; set; }
}}

    private _xyz = new Xyz
    {
{{FOR_EACH_PROPERTY_REMOVE_FINAL_COMMA:
        PropertyName = "aaa",
}}
    }
}
