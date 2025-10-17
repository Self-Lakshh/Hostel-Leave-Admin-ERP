"use client";

import type { DialogContentProps } from './Dialog';
import { Dialog as DialogObject } from './Dialog';

// Re-export Dialog components as Modal components for backward compatibility
export const Modal = DialogObject;

// Export props type for consumers

// Example usage:
// const MyDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <Modal.Root>
//       <Modal.Content 
//         isOpen={isOpen} 
//         onClose={() => setIsOpen(false)}
//         title="My Dialog"
//         description="This is a description"
//       >
//         <div>Content goes here</div>
//         <Modal.Footer>
//           <button onClick={() => setIsOpen(false)}>Close</button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal.Root>
//   );
// };

export type ModalProps = DialogContentProps;
