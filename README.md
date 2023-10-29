# LitElement Dropdown Web Component

A custom web component created with LitElement that mimics a Bootstrap Dropdown. It provides a simple and customizable dropdown functionality with the following features:

- Click on the button or any specified element to open and close the dropdown.
- Clicking outside the dropdown closes it.
- Each list item can have active.
- Provides an option to configure whether the dropdown opens to the left or right of the element.

## Getting Started

Follow these instructions to use the LitElement Dropdown Web Component in your project.

### Prerequisites

Ensure you have the following installed in your development environment:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install the required dependencies:
    - npm install --save

4. To run the Project
    - npm run dev


#Configuration

<c-dropdown .id=${""} .label=${} .options=${} @onSelect=${(event: Event) => console.log(event.target)} .position=${} ></c-dropdown>

    1. id: to be attached to different tags in the component.
    2. label : label for the dropdown button
    3. options : dropdown list having object structure as {id:null, name:"", active: false} 
    4. onSelect : function which will be triggerd from the component on selection of dropdown list item.
    5. position : position where the dropdown list should open ("top","left","right","bottom"),if there is 
        not enought space to open the list, the position will be set to bottom.

###Acknowledgments

1. LitElement: https://lit.dev/ 
2. Vite: https://vitejs.dev/
