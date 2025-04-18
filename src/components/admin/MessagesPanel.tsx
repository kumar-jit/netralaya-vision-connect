
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Eye, Search, Trash2, Calendar, Mail, User } from "lucide-react";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/sonner";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: any; // Firestore timestamp
  date?: string; // Formatted date string
}

export function MessagesPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  // Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const messagesData: Message[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Convert Firestore timestamp to JS Date
          const date = data.timestamp?.toDate ? 
            formatDistanceToNow(data.timestamp.toDate(), { addSuffix: true }) : 
            "Unknown date";
            
          messagesData.push({
            id: doc.id,
            ...data,
            date
          } as Message);
        });
        
        setMessages(messagesData);
        setFilteredMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(message => 
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchTerm, messages]);

  const handleViewMessage = (message: Message) => {
    setViewingMessage(message);
  };

  const handleDeletePrompt = (message: Message) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const deleteMessage = async () => {
    if (!messageToDelete) return;
    
    try {
      await deleteDoc(doc(db, "messages", messageToDelete.id));
      
      // Update the local state
      setMessages(messages.filter(m => m.id !== messageToDelete.id));
      setFilteredMessages(filteredMessages.filter(m => m.id !== messageToDelete.id));
      
      toast.success("Message deleted successfully");
      setIsDeleteDialogOpen(false);
      
      // If the deleted message was being viewed, close the view dialog
      if (viewingMessage && viewingMessage.id === messageToDelete.id) {
        setViewingMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                Messages submitted through the contact form
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-eyepurple border-opacity-50 border-t-eyepurple rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              {searchTerm ? (
                <>
                  <h3 className="text-lg font-medium mb-2">No matching messages</h3>
                  <p className="text-muted-foreground">
                    No messages match your search for "{searchTerm}"
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
                  <p className="text-muted-foreground">
                    You haven't received any contact messages yet.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <Card key={message.id} className="overflow-hidden hover:border-eyepurple/50 transition-colors">
                  <CardContent className="p-0">
                    <div className="p-4 md:p-6 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-12 md:col-span-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-eyepurple" />
                          <span className="font-medium">{message.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{message.email}</span>
                        </div>
                      </div>
                      
                      <div className="col-span-10 md:col-span-6">
                        <p className="line-clamp-1 text-muted-foreground">
                          {message.message}
                        </p>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {message.date}
                        </div>
                      </div>
                      
                      <div className="col-span-2 md:col-span-2 flex justify-end md:justify-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMessage(message)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePrompt(message)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={!!viewingMessage} onOpenChange={(open) => !open && setViewingMessage(null)}>
        {viewingMessage && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Message from {viewingMessage.name}</DialogTitle>
              <DialogDescription>
                Received {viewingMessage.date}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">{viewingMessage.email}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Message</h4>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm whitespace-pre-line">{viewingMessage.message}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setViewingMessage(null)}
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setMessageToDelete(viewingMessage);
                  setViewingMessage(null);
                  setIsDeleteDialogOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this message from {messageToDelete?.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteMessage}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
