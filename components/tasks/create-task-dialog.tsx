// "use client";

// import { toast } from "sonner";
// import { useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectItem,
//   SelectValue,
//   SelectTrigger,
//   SelectContent,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { TMember, TProject } from "@/lib/types";

// export function CreateTaskDialog({
//   children,
//   projects,
//   members,
// }: {
//   children: React.ReactNode;
//   projects: TProject[];
//   members: TMember[];
// }) {
//   const [open, setOpen] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [projectId, setProjectId] = useState("");

//   const [priority, setPriority] = useState("Medium");

//   const [status, setStatus] = useState("Pending");

//   const [assignedMemberId, setAssignedMemberId] = useState("");

//   const [showConfirm, setShowConfirm] = useState(false);

//   const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

//   async function handleSubmit(formData: FormData, skipCheck = false) {
//     if (!projectId) {
//       toast.error("Please select a project");
//       return;
//     }

//     formData.append("project_id", projectId);
//     formData.append("priority", priority);
//     formData.append("status", status);
//     formData.append("assigned_member_id", assignedMemberId);

//     setLoading(true);
//     const result = await createTask(formData);
//     setLoading(false);

//     if (result.error && result.needsConfirmation && !skipCheck) {
//       setPendingFormData(formData);
//       setShowConfirm(true);
//       return;
//     }

//     if (result.error) {
//       toast.error(result.error);
//     } else {
//       toast.success("Task created successfully");
//       setOpen(false);
//       setProjectId("");
//       setPriority("Medium");
//       setStatus("Pending");
//       setAssignedMemberId("");
//     }
//   }

//   function handleConfirmedSubmit() {
//     if (pendingFormData) {
//       handleSubmit(pendingFormData, true);
//       setShowConfirm(false);
//       setPendingFormData(null);
//     }
//   }

//   if (projects.length === 0) {
//     return (
//       <Dialog>
//         <DialogTrigger asChild>{children}</DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>No Projects Available</DialogTitle>
//             <DialogDescription>
//               You need to create a project first before creating tasks.
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   const selectedMember = members.find((m) => m.id === assignedMemberId);

//   return (
//     <>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>{children}</DialogTrigger>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Create Task</DialogTitle>
//             <DialogDescription>
//               Create a new task for your project
//             </DialogDescription>
//           </DialogHeader>
//           <form
//             action={(formData) => handleSubmit(formData)}
//             className="space-y-4"
//           >
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="project">Project</Label>
//                 <Select value={projectId} onValueChange={setProjectId}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a project" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {projects.map((project) => (
//                       <SelectItem key={project.id} value={project.id}>
//                         {project.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="priority">Priority</Label>
//                 <Select value={priority} onValueChange={setPriority}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Low">Low</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="High">High</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="title">Task Title</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 placeholder="Implement login feature"
//                 required
//                 maxLength={200}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 placeholder="Describe the task..."
//                 rows={3}
//                 maxLength={1000}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="status">Status</Label>
//                 <Select value={status} onValueChange={setStatus}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Pending">Pending</SelectItem>
//                     <SelectItem value="In Progress">In Progress</SelectItem>
//                     <SelectItem value="Done">Done</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="assignedMember">Assign To</Label>
//                 <Select
//                   value={assignedMemberId}
//                   onValueChange={setAssignedMemberId}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Unassigned" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="">Unassigned</SelectItem>
//                     {members.map((member) => (
//                       <SelectItem key={member.id} value={member.id}>
//                         {member.name} ({member.task_count || 0}/
//                         {member.capacity})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="flex justify-end gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Creating..." : "Create Task"}
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {showConfirm && selectedMember && (
//         <ConfirmAssignDialog
//           open={showConfirm}
//           onOpenChange={setShowConfirm}
//           memberName={selectedMember.name}
//           onConfirm={handleConfirmedSubmit}
//         />
//       )}
//     </>
//   );
// }
