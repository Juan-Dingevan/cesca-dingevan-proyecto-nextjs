import React from 'react';

export default function Quote({text} : {text: string}) {
  return (
    <div className="bg-slate-200 p-4 rounded-2xl shadow-md m-4">
      <blockquote className="italic text-xl">{text}</blockquote>
    </div>
  );
};
