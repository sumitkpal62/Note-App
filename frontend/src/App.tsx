import './App.css'

const App = () => {
  return (
    <div className="app-container">
      <form className="note-form">
        <input type="text" placeholder="Title" required />
        <textarea placeholder="Content" rows={10} required />
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        <div className="note-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>Note Title</h2>
          <p>Note Content</p>
        </div>
      </div>
    </div>
  )
}

export default App