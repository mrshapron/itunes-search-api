using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace SongsAPI.Models
{
    //Class that represent item from itunes api with how much time it was searched on my website
    [DataContract]
    public class Item
    {
        [DataMember(Name ="itunes_id")]
        public int ItunesID { get; set; }
        [DataMember(Name = "count_search")]
        public int CountSearch { get; set; }

        public Item()
        {
          
        }

        public Item(int id = 0)
        {
            ItunesID = id;
            CountSearch = 0;
        }

        public Item(int id = 0, int count = 0)
        {
            ItunesID = id;
            CountSearch = count;
        }

    }
}