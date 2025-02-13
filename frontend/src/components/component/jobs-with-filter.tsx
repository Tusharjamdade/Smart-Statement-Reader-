"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import axios from "axios";
import Link from "next/link";

export function JobsWithFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    location: [],
    jobType: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/user/getjobs');
        const jobsWithImageUrls = response.data.posts.map(post => {
          const blob = new Blob([new Uint8Array(post.thumbnail.data)], { type: 'image/png' });
          const url = URL.createObjectURL(blob);
          return { ...post, thumbnailUrl: url };
        });
        setPosts(jobsWithImageUrls);

        // Extract unique categories, locations, and job types for filtering
        const categoriesSet = new Set(jobsWithImageUrls.map(post => post.category));
        const locationsSet = new Set(jobsWithImageUrls.map(post => post.location));
        const jobTypesSet = new Set(jobsWithImageUrls.map(post => post.jobType));
        
        setCategories([...categoriesSet]);
        setLocations([...locationsSet]);
        setJobTypes([...jobTypesSet]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getData();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch = filters.category.length === 0 || filters.category.includes(post.category);
      const locationMatch = filters.location.length === 0 || filters.location.includes(post.location);
      const jobTypeMatch = filters.jobType.length === 0 || filters.jobType.includes(post.jobType);
      const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && locationMatch && jobTypeMatch && searchMatch;
    });
  }, [filters, searchTerm, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <header className="bg-background p-4 md:p-6 shadow">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full rounded-md bg-muted text-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon className="w-5 h-5" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div>
                  <DropdownMenuLabel>Category</DropdownMenuLabel>
                  {categories.map(category => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filters.category.includes(category)}
                      onClick={() => handleFilterChange('category', category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <div>
                  <DropdownMenuLabel>Location</DropdownMenuLabel>
                  {locations.map(location => (
                    <DropdownMenuCheckboxItem
                      key={location}
                      checked={filters.location.includes(location)}
                      onClick={() => handleFilterChange('location', location)}
                    >
                      {location}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <div>
                  <DropdownMenuLabel>Job Type</DropdownMenuLabel>
                  {jobTypes.map(jobType => (
                    <DropdownMenuCheckboxItem
                      key={jobType}
                      checked={filters.jobType.includes(jobType)}
                      onClick={() => handleFilterChange('jobType', jobType)}
                    >
                      {jobType}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <Link href={`bid/${post.id}`}>
            <div key={post.id} className="bg-background rounded-md shadow overflow-hidden">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <Badge variant="outline">{post.location}</Badge>
                  <Badge variant="outline">{post.jobType}</Badge>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
