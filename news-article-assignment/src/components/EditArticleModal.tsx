// components/EditArticleModal.tsx
import { FC, useState } from 'react';

interface EditArticleModalProps {
  isOpen: boolean;
  article: {
    id: string;
    title: string;
    summary: string[];
    publisher: string;
  };
  onClose: () => void;
  onSave: (id: string, data: { title: string; summary: string[]; publisher: string; }) => void;
}

const EditArticleModal: FC<EditArticleModalProps> = ({ isOpen, article, onClose, onSave }) => {
  const [title, setTitle] = useState(article.title);
  const [summary, setSummary] = useState(article.summary.join('\n'));
  const [publisher, setPublisher] = useState(article.publisher);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(article.id, {
      title,
      summary: summary.split('\n').filter(line => line.trim() !== ''),
      publisher
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Article</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Summary Points (one per line):</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={5}
            />
          </div>
          <div>
            <label>Publisher:</label>
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleModal;