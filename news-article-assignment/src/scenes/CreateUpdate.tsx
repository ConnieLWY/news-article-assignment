// components/CreateUpdate.tsx
import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface CreateUpdateProps {
  title: string;
}

const CreateUpdate: FC<CreateUpdateProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL if editing
  const [formData, setFormData] = useState({
    title: '',
    summary: [''],
    publisher: ''
  });

  // Fetch article data if editing
  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const { data } = await axios.get(`https://localhost:7085/api/Article/get/${id}`);
          setFormData({
            title: data.title,
            summary: data.summary,
            publisher: data.publisher
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing article
        await axios.put(`https://localhost:7085/api/Article/update/${id}`, formData);
      } else {
        // Create new article
        await axios.post('https://localhost:7085/api/Article/create', formData);
      }
      navigate('/display');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Article' : 'Create New Article'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label>Summary Points (one per line):</label>
          <textarea
            value={formData.summary.join('\n')}
            onChange={(e) => {
              const text = e.target.value;
              setFormData({
                ...formData,
                summary: text.split('\n')
              });
            }}
            rows={5}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Prevent the default form submission on Enter
                e.stopPropagation();
              }
            }}
          />
        </div>
        <div>
          <label>Publisher:</label>
          <input
            type="text"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
          />
        </div>
        <div className="button-group">
          <button type="submit">{id ? 'Update' : 'Create'} Article</button>
          <button type="button" onClick={() => navigate('/display')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdate;