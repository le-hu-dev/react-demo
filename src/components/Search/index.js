import React from "react";
import Search from "./comp/Search";

const SearchPage = () => (
  <div class="container">
    <div class="row top-to-header">
      <div class="col-sm-11 col-md-11 col-lg-10 mx-auto">
        <h1>iTune Search</h1>
        <p>This Page will fetch data from iTunes Search API.</p>
        <Search name="Class" />
      </div>
    </div>
  </div>
);

export default SearchPage;
