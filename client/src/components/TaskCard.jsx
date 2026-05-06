// import { useState } from "react";
// import "../styles/card.css";

// const TaskCard = ({ task, onUpdate, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(task.title);
//   const [editedDescription, setEditedDescription] = useState(task.description || "");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleToggleComplete = async () => {
//     const newStatus = task.status === "completed" ? "pending" : "completed";
//     if (onUpdate) {
//       await onUpdate(task._id || task.id, { ...task, status: newStatus });
//     }
//   };

//   const handleEdit = async () => {
//     if (isEditing) {
//       if (editedTitle.trim() && onUpdate) {
//         await onUpdate(task._id || task.id, { 
//           ...task, 
//           title: editedTitle, 
//           description: editedDescription 
//         });
//       }
//       setIsEditing(false);
//     } else {
//       setIsEditing(true);
//     }
//   };

//   const handleDelete = async () => {
//     if (onDelete) {
//       await onDelete(task._id || task.id);
//     }
//     setShowDeleteConfirm(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       handleEdit();
//     }
//     if (e.key === 'Escape') {
//       setIsEditing(false);
//       setEditedTitle(task.title);
//       setEditedDescription(task.description || "");
//     }
//   };

//   const getStatusIcon = () => {
//     switch(task.status) {
//       case "completed":
//         return "✓";
//       case "pending":
//         return "○";
//       default:
//         return "●";
//     }
//   };

//   const getStatusLabel = () => {
//     switch(task.status) {
//       case "completed":
//         return "Completed";
//       case "pending":
//         return "Pending";
//       default:
//         return task.status || "Unknown";
//     }
//   };

//   return (
//     <div 
//       className={`task-card ${task.status} ${isHovered ? 'hovered' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="card-badge">
//         <span className={`status-badge ${task.status}`}>
//           {getStatusIcon()} {getStatusLabel()}
//         </span>
//         {task.priority && (
//           <span className={`priority-badge ${task.priority}`}>
//             {task.priority}
//           </span>
//         )}
//       </div>

//       {isEditing ? (
//         <div className="edit-form">
//           <input
//             type="text"
//             className="edit-title-input"
//             value={editedTitle}
//             onChange={(e) => setEditedTitle(e.target.value)}
//             placeholder="Task title"
//             onKeyPress={handleKeyPress}
//             autoFocus
//           />
//           <textarea
//             className="edit-description-input"
//             value={editedDescription}
//             onChange={(e) => setEditedDescription(e.target.value)}
//             placeholder="Task description"
//             rows="3"
//             onKeyPress={handleKeyPress}
//           />
//           <div className="edit-actions">
//             <button className="save-edit-btn" onClick={handleEdit}>
//               💾 Save
//             </button>
//             <button className="cancel-edit-btn" onClick={() => {
//               setIsEditing(false);
//               setEditedTitle(task.title);
//               setEditedDescription(task.description || "");
//             }}>
//               ✕ Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="card-content">
//             <h3 className="task-title">{task.title}</h3>
//             {task.description && (
//               <p className="task-description">{task.description}</p>
//             )}
//             {task.dueDate && (
//               <div className="task-due-date">
//                 <span className="due-icon">📅</span>
//                 <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
//               </div>
//             )}
//           </div>

//           <div className="card-actions">
//             <button 
//               onClick={handleToggleComplete} 
//               className={`action-btn ${task.status === "completed" ? "undo-btn" : "complete-btn"}`}
//               title={task.status === "completed" ? "Mark as pending" : "Mark as complete"}
//             >
//               {task.status === "completed" ? "↺ Undo" : "✓ Complete"}
//             </button>
            
//             <button 
//               onClick={handleEdit} 
//               className="action-btn edit-btn"
//               title="Edit task"
//             >
//               ✎ Edit
//             </button>
            
//             <button 
//               onClick={() => setShowDeleteConfirm(true)} 
//               className="action-btn delete-btn"
//               title="Delete task"
//             >
//               🗑 Delete
//             </button>
//           </div>
//         </>
//       )}

//       {showDeleteConfirm && (
//         <div className="delete-confirm-overlay">
//           <div className="delete-confirm-dialog">
//             <p>Are you sure you want to delete</p>
//             <strong>"{task.title}"</strong>
//             <div className="confirm-actions">
//               <button onClick={handleDelete} className="confirm-delete-btn">
//                 Yes, Delete
//               </button>
//               <button onClick={() => setShowDeleteConfirm(false)} className="confirm-cancel-btn">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskCard;



import { useState } from "react";
import "../styles/card.css";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get task status (supports both 'status' and 'completed' fields)
  const taskStatus = task.status || (task.completed ? "completed" : "pending");

  const handleToggleComplete = async () => {
    const newStatus = taskStatus === "completed" ? "pending" : "completed";
    const updatedTask = { 
      ...task, 
      status: newStatus,
      completed: newStatus === "completed"
    };
    if (onUpdate) {
      await onUpdate(task._id || task.id, updatedTask);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (editedTitle.trim() && onUpdate) {
        await onUpdate(task._id || task.id, { 
          ...task, 
          title: editedTitle, 
          description: editedDescription,
          status: taskStatus,
          completed: taskStatus === "completed"
        });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(task._id || task.id);
    }
    setShowDeleteConfirm(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleEdit();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(task.title);
      setEditedDescription(task.description || "");
    }
  };

  const getStatusIcon = () => {
    switch(taskStatus) {
      case "completed":
        return "✓";
      case "pending":
        return "○";
      default:
        return "●";
    }
  };

  const getStatusLabel = () => {
    switch(taskStatus) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return taskStatus || "Unknown";
    }
  };

  return (
    <div 
      className={`task-card ${taskStatus} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-badge">
        <span className={`status-badge ${taskStatus}`}>
          {getStatusIcon()} {getStatusLabel()}
        </span>
        {task.priority && (
          <span className={`priority-badge ${task.priority}`}>
            {task.priority}
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            className="edit-title-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task title"
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <textarea
            className="edit-description-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Task description"
            rows="3"
            onKeyPress={handleKeyPress}
          />
          <div className="edit-actions">
            <button className="save-edit-btn" onClick={handleEdit}>
              💾 Save
            </button>
            <button className="cancel-edit-btn" onClick={() => {
              setIsEditing(false);
              setEditedTitle(task.title);
              setEditedDescription(task.description || "");
            }}>
              ✕ Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-content">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            {task.dueDate && (
              <div className="task-due-date">
                <span className="due-icon">📅</span>
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="card-actions">
            <button 
              onClick={handleToggleComplete} 
              className={`action-btn ${taskStatus === "completed" ? "undo-btn" : "complete-btn"}`}
              title={taskStatus === "completed" ? "Mark as pending" : "Mark as complete"}
            >
              {taskStatus === "completed" ? "↺ Undo" : "✓ Complete"}
            </button>
            
            <button 
              onClick={handleEdit} 
              className="action-btn edit-btn"
              title="Edit task"
            >
              ✎ Edit
            </button>
            
            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="action-btn delete-btn"
              title="Delete task"
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-dialog">
            <p>Are you sure you want to delete</p>
            <strong>"{task.title}"</strong>
            <div className="confirm-actions">
              <button onClick={handleDelete} className="confirm-delete-btn">
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="confirm-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;