
import { useState, useEffect } from "react";
import { collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Pencil, Trash2, AlertCircle, Clock } from "lucide-react";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/sonner";
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
import { motion } from "framer-motion";

interface LocationHours {
  day: string;
  time: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  hours: LocationHours[];
}

export function ChamberLocationsPanel() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHoursDialogOpen, setIsHoursDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editHours, setEditHours] = useState<LocationHours[]>([]);

  // Fetch all locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locationsList: Location[] = [];
        querySnapshot.forEach((doc) => {
          locationsList.push({ id: doc.id, ...doc.data() } as Location);
        });
        setLocations(locationsList);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to load chamber locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Handle edit dialog open
  const handleEdit = (location: Location) => {
    setCurrentLocation(location);
    setEditName(location.name);
    setEditAddress(location.address);
    setIsEditDialogOpen(true);
  };

  // Handle hours dialog open
  const handleEditHours = (location: Location) => {
    setCurrentLocation(location);
    setEditHours([...location.hours]);
    setIsHoursDialogOpen(true);
  };

  // Handle delete dialog open
  const handleDeletePrompt = (location: Location) => {
    setCurrentLocation(location);
    setIsDeleteDialogOpen(true);
  };

  // Save edited location
  const saveLocationChanges = async () => {
    if (!currentLocation) return;
    
    try {
      const locationRef = doc(db, "locations", currentLocation.id);
      await updateDoc(locationRef, {
        name: editName,
        address: editAddress
      });
      
      // Update the local state
      setLocations(locations.map(loc => 
        loc.id === currentLocation.id 
          ? { ...loc, name: editName, address: editAddress }
          : loc
      ));
      
      toast.success("Location updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location");
    }
  };

  // Save edited hours
  const saveHoursChanges = async () => {
    if (!currentLocation) return;
    
    try {
      const locationRef = doc(db, "locations", currentLocation.id);
      await updateDoc(locationRef, {
        hours: editHours
      });
      
      // Update the local state
      setLocations(locations.map(loc => 
        loc.id === currentLocation.id 
          ? { ...loc, hours: editHours }
          : loc
      ));
      
      toast.success("Operating hours updated successfully");
      setIsHoursDialogOpen(false);
    } catch (error) {
      console.error("Error updating hours:", error);
      toast.error("Failed to update operating hours");
    }
  };

  // Handle hour change
  const handleHourChange = (index: number, field: 'day' | 'time', value: string) => {
    const updatedHours = [...editHours];
    updatedHours[index][field] = value;
    setEditHours(updatedHours);
  };

  // Delete location
  const deleteLocation = async () => {
    if (!currentLocation) return;
    
    try {
      await deleteDoc(doc(db, "locations", currentLocation.id));
      
      // Update the local state
      setLocations(locations.filter(loc => loc.id !== currentLocation.id));
      
      toast.success("Location deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Failed to delete location");
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
          <CardTitle>Chamber Locations</CardTitle>
          <CardDescription>
            Manage your clinic locations and operating hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-eyepurple border-opacity-50 border-t-eyepurple rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading locations...</p>
            </div>
          ) : locations.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <h3 className="text-lg font-medium mb-2">No Locations Found</h3>
              <p className="text-muted-foreground mb-4">
                You haven't added any chamber locations yet.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '#add-location'}>
                Add Your First Location
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Operating Days</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location) => (
                    <TableRow key={location.id} className="group">
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>{location.address}</TableCell>
                      <TableCell>
                        {location.hours
                          .filter(h => h.time !== "Closed")
                          .map(h => h.day)
                          .join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditHours(location)}
                            className="transition-all hover:bg-eyepurple hover:text-white"
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Hours
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(location)}
                            className="transition-all hover:bg-blue-500 hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePrompt(location)}
                            className="transition-all hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Location Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update the details of this chamber location
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name</Label>
              <Input 
                id="name" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={editAddress} 
                onChange={(e) => setEditAddress(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={saveLocationChanges}
              className="bg-eyepurple hover:bg-eyepurple/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Hours Dialog */}
      <Dialog open={isHoursDialogOpen} onOpenChange={setIsHoursDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Operating Hours</DialogTitle>
            <DialogDescription>
              {currentLocation?.name} - Set the operating hours for each day
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {editHours && editHours.map((hour, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <Label htmlFor={`day-${index}`}>Day</Label>
                  <Input 
                    id={`day-${index}`} 
                    value={hour.day} 
                    onChange={(e) => handleHourChange(index, 'day', e.target.value)}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor={`time-${index}`}>Hours</Label>
                  <Input 
                    id={`time-${index}`} 
                    value={hour.time} 
                    onChange={(e) => handleHourChange(index, 'time', e.target.value)}
                    placeholder="9:00 AM - 5:00 PM or Closed"
                  />
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHoursDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={saveHoursChanges}
              className="bg-eyepurple hover:bg-eyepurple/90"
            >
              Save Hours
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{currentLocation?.name}" location and all its data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteLocation}
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
