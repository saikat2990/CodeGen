using Newtonsoft.Json;

namespace Shared.Models;

public class GridRequestQuery
{
    [JsonProperty("skip")]
    public int Skip { get; set; }

    [JsonProperty("take")]
    public int Take { get; set; }

    //[HtmlAttributeName("antiForgery")]
    //[JsonProperty("antiForgery")]
    //public string antiForgery { get; set; }

    //[HtmlAttributeName("requiresCounts")]
    //[JsonProperty("requiresCounts")]
    //public bool RequiresCounts { get; set; }

    //[HtmlAttributeName("table")]
    //[JsonProperty("table")]
    //public string Table { get; set; }

    //[HtmlAttributeName("group")]
    //[JsonProperty("group")]
    //public List<string> Group { get; set; }

    //[HtmlAttributeName("select")]
    //[JsonProperty("select")]
    //public List<string> Select { get; set; }

    //[HtmlAttributeName("expand")]
    //[JsonProperty("expand")]
    //public List<string> Expand { get; set; }

    //[HtmlAttributeName("sorted")]
    //[JsonProperty("sorted")]
    //public List<Sort> Sorted { get; set; }

    //[HtmlAttributeName("search")]
    //[JsonProperty("search")]
    //public List<SearchFilter> Search { get; set; }

    //[HtmlAttributeName("where")]
    //[JsonProperty("where")]
    //public List<WhereFilter> Where { get; set; }

    //[HtmlAttributeName("aggregates")]
    //[JsonProperty("aggregates")]
    //public List<Aggregate> Aggregates { get; set; }

    //[HtmlAttributeName("onDemandGroupInfo")]
    //[JsonProperty("onDemandGroupInfo")]
    //public OnDemandGroupInfo OnDemandGroupInfo { get; set; }

    //[HtmlAttributeName("isLazyLoad")]
    //[JsonProperty("isLazyLoad")]
    //public bool IsLazyLoad { get; set; }
}
