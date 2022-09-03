function animator(time, parameters) { 
  
  return new Promise((resolve, reject) => {
      const { 
        onUpdate, 
      } = parameters; 
    
      const startTime = performance.now(); 
      
      const update = () => { 
        const nowTime = performance.now(); 
        const progress = (nowTime - startTime) / time; 
    
        if (progress < 1) { 
          onUpdate(progress); 
          requestAnimationFrame(() => update()); 
        } else { 
          onUpdate(1); 
          resolve(); 
        } 
      }; 
    
      requestAnimationFrame(() => update());
  });
} 
 
export { 
  animator 
};