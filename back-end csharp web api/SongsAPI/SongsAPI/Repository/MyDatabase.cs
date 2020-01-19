using Npgsql;
using SongsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SongsAPI.Repository
{
    public class MyDatabase
    {
        private static string connstring = String.Format("Server ={0}; Port={1};" +
            "User Id = {2};Password={3};Database={4};",
            "localhost", 5432, "postgres", "123123", "ItunesAPI");
        private static NpgsqlConnection conn;

        public MyDatabase()
        {

        }
        /// <summary>
        /// function that takes from the db the top 10 viewed items
        /// </summary>
        /// <returns>list of the 10 items</returns>
        public IEnumerable<Item> GetTop10MostViewed()
        {
            string query = @"SELECT * from itemApi " +
                            "ORDER BY item_count_search " +
                            "DESC LIMIT 10";
            List<Item> items = new List<Item>();
            using (conn = new NpgsqlConnection(connstring))
            {
                using (NpgsqlCommand cmd = new NpgsqlCommand(query, conn))
                {
                    conn.Open();
                    using(NpgsqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            items.Add(new Item((int)reader["itunes_id"], (int)reader["item_count_search"]));
                        }
                    }
                }
            }
            if (items.Count > 0)
                return items;
            return null;
        }
        /// <summary>
        /// Function that returns all Items from the database
        /// </summary>
        /// <returns>all items</returns>

        public IEnumerable<Item> GetAllItems()
        {
            string query = @"SELECT * from itemApi " +
                            "ORDER BY item_count_search ";
            List<Item> items = new List<Item>();
            using (conn = new NpgsqlConnection(connstring))
            {
                using (NpgsqlCommand cmd = new NpgsqlCommand(query, conn))
                {
                    conn.Open();
                    using (NpgsqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            items.Add(new Item((int)reader["itunes_id"], (int)reader["item_count_search"]));
                        }
                    }
                }
            }
            if (items.Count > 0)
                return items;
            return null;
        }

        public Item GetItemByItunesID(int itunes_id)
        {
            string query = @"SELECT * from itemApi " +
                            $"WHERE itunes_id = {itunes_id}";
            using (conn = new NpgsqlConnection(connstring))
            {
                using (NpgsqlCommand cmd = new NpgsqlCommand(query, conn))
                {
                    conn.Open();
                    using (NpgsqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Item((int)reader["itunes_id"], (int)reader["item_count_search"]);
                        }
                        return null;
                    }
                }
            }
        }

        /// <summary>
        /// function that insert to the db new item and reset the count search
        /// </summary>
        /// <param name="item">the item that insert</param>
        /// <returns>true if succedded else false</returns>
        private DBStatus InsertItemToDB(int itunes_id)
        {
            string query = "INSERT INTO itemApi(item_count_search, itunes_id) " +
                            $"VALUES({0}, {itunes_id})";
            int result = 0;
            using (conn = new NpgsqlConnection(connstring))
            {
                conn.Open();
                using(NpgsqlCommand cmd = new NpgsqlCommand(query, conn))
                {
                    result = cmd.ExecuteNonQuery();
                }
            }

            if(result == 1)
                return DBStatus.Created;
            return DBStatus.Error;
        }

        public DBStatus AddToSearch(int itunes_id)
        {
            if (isExistInDB(itunes_id) == DBStatus.Found)
            {
                IncSearchByItunesId(itunes_id);
                return DBStatus.Modified;
            }
            else
            {
                InsertItemToDB(itunes_id);
                return DBStatus.Created;
            }
        }

        /// <summary>
        /// functions that check if the item is exist in the db 
        /// </summary>
        /// <param name="itunes_id">the key</param>
        /// <returns>if exists true else false</returns>

        private DBStatus isExistInDB(int itunes_id)
        {
            string query = "SELECT * FROM ItemApi " +
                            $"WHERE itunes_id = {itunes_id}";

            using(conn = new NpgsqlConnection(connstring))
            {
                conn.Open();
                using (NpgsqlCommand cmd = new NpgsqlCommand(query, conn))
                {
                    using(NpgsqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                            return DBStatus.Found;
                    }
                }
            }
            return DBStatus.NotFound;
        }

        /// <summary>
        /// Function that increment the count views by 1
        /// </summary>
        /// <param name="itunes_id">increments count search by the *itunes id* in the db</param>
        /// <returns>return true if it succeded else false</returns>
        private DBStatus IncSearchByItunesId(int itunes_id)
        {
            string query = "UPDATE itemApi " +
                            "SET item_count_search = item_count_search + 1 " +
                            $"WHERE itunes_id = {itunes_id}";
            int result = 0;
            using (conn = new NpgsqlConnection(connstring))
            {
                conn.Open();
                using(NpgsqlCommand cmd = new NpgsqlCommand(query, conn))
                {
                    result = cmd.ExecuteNonQuery();
                }
            }

            if (result == 1)
                return DBStatus.Modified;
            return DBStatus.NotFound;
        }
    }

    public enum DBStatus
    {
        Created,
        Modified,
        Removed,
        NotFound,
        Found,
        Error
    }
}