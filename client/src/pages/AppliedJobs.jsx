import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton, Header, ListBox, Loading, JobCard } from "../components";
import { apiRequest, updateURL } from "../utils";
import { useParams } from "react-router-dom";

const AppliedJobs = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchAppliedJobs = async () => {
    setIsFetching(true);

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      sort: sort, 
      navigate: navigate,
      location: location,
    });

    try {
      const res = await apiRequest({
        url: `/jobs//applied-jobs/${userId}`,
        token: user?.token,
        method: "GET",
      });
  
      setNumPage(res?.data?.length > 0 ? Math.ceil(res.data.length / 5) : 1);
      setRecordsCount(res?.data?.length || 0);
  
      // Verifique o localStorage para determinar se o usuário já se inscreveu em um trabalho
      const appliedJobsWithLocalStorage = res.data.map((job) => {
        const isApplied = localStorage.getItem(`applied_${job._id}`) === 'true';
        return { ...job, isApplied };
      });
  
      setAppliedJobs(appliedJobsWithLocalStorage);
  
      setIsFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    await fetchAppliedJobs();
  };

  const handleShowMore = () => {};

  useEffect(() => {
    fetchAppliedJobs();
  }, [page, sort]);

  return (
    <div className="w-full">
      <Header
        title="Your Applied Jobs"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 py-6 bg-[#f7fdfd]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm md:text-base">
            Showing: <span className="font-semibold">{recordsCount}</span> Applied
            Jobs
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base">Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {appliedJobs?.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}

          {isFetching && (
            <div className="mt-10">
              <Loading />
            </div>
          )}

          <p className="text-sm text-right">
            {appliedJobs?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="w-full flex items-center justify-center pt-16">
            <CustomButton
              onClick={handleShowMore}
              title="Load More"
              containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
