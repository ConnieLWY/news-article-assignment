// components/Display.tsx
import { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Articles } from '../App.types';
import Article from '../components/Article';
import EditArticleModal from '../components/EditArticleModal';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

interface DisplayProps {
  title: string;
}

const Display: FC<DisplayProps> = ({ title }) => {
    const navigate = useNavigate();
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Articles | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchArticles = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: pageSize.toString()
      });
  
      if (searchTerm.trim()) {
        params.append('searchTerm', searchTerm);
      }
  
      const { data } = await axios.get(
        `https://localhost:7085/api/Article/paginated?${params.toString()}`
      );
      setTotalItems(data.totalItems)
      setArticles(data.items);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, pageSize]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7085/api/Article/delete/${id}`);
      fetchArticles(currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleUpdate = async (id: string, data: { title: string; summary: string[]; publisher: string; }) => {
    try {
      await axios.put(`https://localhost:7085/api/Article/update/${id}`, data);
      setEditingArticle(null);
      fetchArticles(currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage, fetchArticles]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    fetchArticles(1); // Reset to first page when searching
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className='parent'>
        <div className='child'>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Search articles..."
                    className="search-input"
                />
                <SearchIcon 
                    className="search-icon" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => fetchArticles(currentPage)} 
                />
                </div>
        </div>
        <div className='child'>
        <div style={{color:"green", fontWeight: "800", fontSize:"1.2rem"}}>
                {totalItems} ARTICLES FOUND
            </div>
        </div>
        <div className='child'>
            <Button variant="contained" href="/create" style={{backgroundColor:"green"}}>Create New Article</Button>
            <RefreshIcon 
                fontSize='large' 
                style={{verticalAlign:"middle", marginLeft: '10px', color:"green"}} 
                onClick={() => fetchArticles(currentPage)}
                />
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {articles.map(({ id, title, summary, createdAt, publisher }) => (
        <Article 
          key={id}
          id={id}
          title={title} 
          summary={summary} 
          createdAt={createdAt}
          publisher={publisher}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      {editingArticle && (
        <EditArticleModal
          isOpen={true}
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onSave={handleUpdate}
        />
      )}
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Display;