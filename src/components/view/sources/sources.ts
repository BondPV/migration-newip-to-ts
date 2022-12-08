import './sources.css';

interface Sourse {
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string,
}

class Sources {
  draw(data: Sourse[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp')  as HTMLTemplateElement;

  if(sourceItemTemp) {
    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;
    
      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
    
      fragment.append(sourceClone);
    });
    
    (document.querySelector('.sources') as HTMLInputElement).append(fragment);
    }
  }
}

export default Sources;
