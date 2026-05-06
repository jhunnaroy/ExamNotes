








// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import TaskCard from "../components/TaskCard";
// import Navbar from "../components/Navbar";
// import "../styles/dashboard.css";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [showForm, setShowForm] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//   });

//   useEffect(() => {
//     let isMounted = true;
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//     } else {
//       fetchTasks(isMounted);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [navigate]);

//   const fetchTasks = async (isMounted) => {
//     try {
//       setLoading(true);
//       const res = await API.get("/tasks");
//       if (isMounted) {
//         setTasks(res.data);
//         setError("");
//       }
//     } catch (error) {
//       if (isMounted) {
//         setError(error.response?.data?.message || "Failed to load tasks");
//       }
//     } finally {
//       if (isMounted) {
//         setLoading(false);
//       }
//     }
//   };

//   const handleAddTask = async () => {
//     if (!newTask.title.trim()) {
//       setError("Task title is required");
//       return;
//     }

//     if (newTask.title.length > 100) {
//       setError("Task title must be less than 100 characters");
//       return;
//     }

//     setIsAdding(true);
//     try {
//       const res = await API.post("/tasks", {
//         title: newTask.title.trim(),
//         description: newTask.description.trim(),
//         completed: false,
//       });

//       setTasks([res.data, ...tasks]);
//       setNewTask({ title: "", description: "" });
//       setShowForm(false);
//       setError("");
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to add task");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const updateTask = useCallback(async (id, updatedData) => {
//     try {
//       const res = await API.put(`/tasks/${id}`, updatedData);
//       setTasks(prevTasks => prevTasks.map(t => t._id === id ? res.data : t));
//       setError("");
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to update task");
//     }
//   }, []);

//   const deleteTask = useCallback(async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       setTasks(prevTasks => prevTasks.filter(t => t._id !== id));
//       setError("");
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to delete task");
//     }
//   }, []);

//   const filteredTasks = filter === "completed"
//     ? tasks.filter(t => t.completed)
//     : filter === "pending"
//     ? tasks.filter(t => !t.completed)
//     : tasks;

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading your tasks...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="dashboard-container">
//         <div className="dashboard-header">
//           <h1> My Tasks</h1>
//           <p className="task-count">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</p>
//         </div>

//         <div className="dashboard-controls">
//           <div className="filter-buttons">
//             <button 
//               className={filter === "all" ? "active" : ""} 
//               onClick={() => setFilter("all")}
//             >
//               All
//             </button>
//             <button 
//               className={filter === "pending" ? "active" : ""} 
//               onClick={() => setFilter("pending")}
//             >
//               Pending
//             </button>
//             <button 
//               className={filter === "completed" ? "active" : ""} 
//               onClick={() => setFilter("completed")}
//             >
//               Completed
//             </button>
//           </div>

//           <button className="add-task-btn" onClick={() => setShowForm(true)}>
//             + Add Task
//           </button>
//         </div>

//         {showForm && (
//           <div className="task-form-overlay">
//             <div className="task-form">
//               <h2>Add New Task</h2>
//               <input
//                 type="text"
//                 placeholder="Task title *"
//                 value={newTask.title}
//                 onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                 autoFocus
//               />
//               <textarea
//                 placeholder="Task description (optional)"
//                 value={newTask.description}
//                 onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                 rows="4"
//               />
//               <div className="form-actions">
//                 <button 
//                   className="save-btn" 
//                   onClick={handleAddTask}
//                   disabled={isAdding}
//                 >
//                   {isAdding ? "Adding..." : "Save Task"}
//                 </button>
//                 <button 
//                   className="cancel-btn" 
//                   onClick={() => {
//                     setShowForm(false);
//                     setNewTask({ title: "", description: "" });
//                     setError("");
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {error && <div className="error-message">{error}</div>}

//         {filteredTasks.length === 0 ? (
//           <div className="empty-state">
//             <div className="empty-icon">📋</div>
//             <h3>No tasks found</h3>
//             <p>
//               {filter !== "all" 
//                 ? `You don't have any ${filter} tasks.` 
//                 : "Get started by creating your first task!"}
//             </p>
//             {filter !== "all" && (
//               <button className="clear-filter-btn" onClick={() => setFilter("all")}>
//                 View all tasks
//               </button>
//             )}
//             {tasks.length === 0 && (
//               <button className="create-first-btn" onClick={() => setShowForm(true)}>
//                 + Create Your First Task
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="task-grid">
//             {filteredTasks.map(task => (
//               <TaskCard
//                 key={task._id}
//                 task={task}
//                 onUpdate={updateTask}
//                 onDelete={deleteTask}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;










import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchTasks(isMounted);
    }

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const fetchTasks = async (isMounted) => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      if (isMounted) {
        // Ensure each task has both status and completed fields
        const tasksWithStatus = res.data.map(task => ({
          ...task,
          status: task.status || (task.completed ? "completed" : "pending"),
          completed: task.completed ?? (task.status === "completed")
        }));
        setTasks(tasksWithStatus);
        setError("");
      }
    } catch (error) {
      if (isMounted) {
        setError(error.response?.data?.message || "Failed to load tasks");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      setError("Task title is required");
      return;
    }

    if (newTask.title.length > 100) {
      setError("Task title must be less than 100 characters");
      return;
    }

    setIsAdding(true);
    try {
      const res = await API.post("/tasks", {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        completed: false,
        status: "pending"
      });

      const newTaskWithStatus = {
        ...res.data,
        status: "pending",
        completed: false
      };

      setTasks([newTaskWithStatus, ...tasks]);
      setNewTask({ title: "", description: "" });
      setShowForm(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add task");
    } finally {
      setIsAdding(false);
    }
  };

  const updateTask = useCallback(async (id, updatedData) => {
    try {
      // Prepare data for API
      const apiData = {
        title: updatedData.title,
        description: updatedData.description,
        completed: updatedData.status === "completed",
        status: updatedData.status
      };
      
      const res = await API.put(`/tasks/${id}`, apiData);
      
      // Ensure the updated task has both fields
      const updatedTask = {
        ...res.data,
        status: res.data.status || (res.data.completed ? "completed" : "pending"),
        completed: res.data.completed ?? (res.data.status === "completed")
      };
      
      setTasks(prevTasks => prevTasks.map(t => t._id === id ? updatedTask : t));
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task");
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(t => t._id !== id));
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete task");
    }
  }, []);

  // Filter tasks based on status
  const filteredTasks = filter === "completed"
    ? tasks.filter(t => t.status === "completed" || t.completed === true)
    : filter === "pending"
    ? tasks.filter(t => t.status === "pending" || t.completed === false)
    : tasks;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
          <p className="task-count">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="dashboard-controls">
          <div className="filter-buttons">
            <button 
              className={filter === "all" ? "active" : ""} 
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button 
              className={filter === "pending" ? "active" : ""} 
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button 
              className={filter === "completed" ? "active" : ""} 
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <button className="add-task-btn" onClick={() => setShowForm(true)}>
            + Add Task
          </button>
        </div>

        {showForm && (
          <div className="task-form-overlay">
            <div className="task-form">
              <h2>Add New Task</h2>
              <input
                type="text"
                placeholder="Task title *"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                autoFocus
              />
              <textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows="4"
              />
              <div className="form-actions">
                <button 
                  className="save-btn" 
                  onClick={handleAddTask}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Save Task"}
                </button>
                <button 
                  className="cancel-btn" 
                  onClick={() => {
                    setShowForm(false);
                    setNewTask({ title: "", description: "" });
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No tasks found</h3>
            <p>
              {filter !== "all" 
                ? `You don't have any ${filter} tasks.` 
                : "Get started by creating your first task!"}
            </p>
            {filter !== "all" && (
              <button className="clear-filter-btn" onClick={() => setFilter("all")}>
                View all tasks
              </button>
            )}
            {tasks.length === 0 && (
              <button className="create-first-btn" onClick={() => setShowForm(true)}>
                + Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="task-grid">
            {filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;