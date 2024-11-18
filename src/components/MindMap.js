import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

function DraggableNode({ node, onClick, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: node.id,
  });
  const style = {
    transform: `translate3d(${transform ? transform.x : 0}px, ${
      transform ? transform.y : 0
    }px, 0)`,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onClick={() => onClick(node.id)}
      className={`node p-4 m-2 rounded-md shadow-lg cursor-pointer 
                  ${node.selected ? "bg-blue-200" : "bg-yellow-200"}`}
    >
      <input
        type="text"
        value={node.text}
        onChange={(e) => onEdit(node.id, e.target.value)}
        className="text-center bg-transparent border-none outline-none w-full font-semibold text-lg"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(node.id);
        }}
        className="mt-2 text-sm text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default function MindMap() {
  const [nodes, setNodes] = useState([
    { id: 1, text: "Main Idea", selected: false },
  ]);

  const handleAddNode = () => {
    const newNode = {
      id: nodes.length + 1,
      text: "New Node",
      selected: false,
    };
    setNodes([...nodes, newNode]);
  };

  const handleSelectNode = (id) => {
    setNodes(
      nodes.map((node) =>
        node.id === id
          ? { ...node, selected: !node.selected }
          : { ...node, selected: false }
      )
    );
  };

  const handleEditNode = (id, newText) => {
    setNodes(
      nodes.map((node) => (node.id === id ? { ...node, text: newText } : node))
    );
  };

  const handleDeleteNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="mindmap-container p-8 flex flex-col items-center bg-gray-100 min-h-screen">
      <button
        onClick={handleAddNode}
        className="mb-4 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        Add Node
      </button>
      <DndContext>
        <div className="flex flex-wrap justify-center">
          {nodes.map((node) => (
            <DraggableNode
              key={node.id}
              node={node}
              onClick={handleSelectNode}
              onDelete={handleDeleteNode}
              onEdit={handleEditNode}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
