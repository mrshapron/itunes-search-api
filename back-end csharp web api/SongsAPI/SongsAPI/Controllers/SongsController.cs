using SongsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Http;
using SongsAPI.Repository;
using System.Net.Http;
using System.Net;
using System.Data.SqlClient;
using System.Web.Http.Cors;

namespace SongsAPI.Controllers
{
    public class SongsController : ApiController
    {
        public MyDatabase MyDB{ get; private set; }
        public SongsController()
        {
            MyDB = new MyDatabase();
        }

        [HttpGet]
        [Route("api/songs/getall")]
        public HttpResponseMessage GetAll()
        {
            var items = MyDB.GetAllItems();
            HttpResponseMessage response;
            if(items == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }
            response = Request.CreateResponse(HttpStatusCode.OK, items);
            return response;
        }
        /// <summary>
        /// Get the Top 10 items searched from the DB
        /// </summary>
        /// <returns>List of items</returns>
        [Route("api/songs/top10")]
        [HttpGet]
        public HttpResponseMessage GetTop10Searched()
        {
            var itemtop10 = MyDB.GetTop10MostViewed();
            var response = Request.CreateResponse(HttpStatusCode.OK, itemtop10);

            return response;
        }

        [HttpGet]
        [Route("api/songs/{itunes_id:int}")]
        public HttpResponseMessage Get(int itunes_id)
        {
            HttpResponseMessage response;
            if (itunes_id == 0)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                DBStatus status = MyDB.AddToSearch(itunes_id);
                if (status == DBStatus.Created)
                {
                    response = Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            return response;
        }
    }
}