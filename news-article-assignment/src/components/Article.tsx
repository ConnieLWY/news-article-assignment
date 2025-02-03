import { FC } from 'react';

interface ArticleProps {
  id: string;
  title: string;
  summary: string[];
  publisher: string;
  createdAt: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void; // Add edit handler
}

const Article: FC<ArticleProps> = ({ id, title, summary, createdAt, publisher, onDelete, onEdit }) => {
  return (
    <div className='box' style={{ position: 'relative' }}>
      {/* Icons container */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        {/* Edit icon */}
        <svg
          onClick={() => onEdit(id)}
          style={{ cursor: 'pointer' }}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>

        {/* Delete icon */}
        <svg
          onClick={() => onDelete(id)}
          style={{ cursor: 'pointer' }}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </div>

      <div style={{color:"#646566", fontSize:"0.8rem"}}>{createdAt}</div>
      <div style={{fontSize:"2rem", fontWeight:"600"}}>
        {title}
      </div>
      <div style={{fontSize:"0.85rem", fontWeight:"500"}}>
        {publisher}
      </div>
      <hr />
      <div>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {summary.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Article;