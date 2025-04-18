
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Calendar } from "lucide-react";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

interface Location {
  id: string;
  name: string;
}

interface RoutineSlot {
  startTime: string;
  endTime: string;
  maxAppointments: number;
}

interface DailyRoutine {
  isAvailable: boolean;
  slots: RoutineSlot[];
}

interface WeeklyRoutine {
  Monday: DailyRoutine;
  Tuesday: DailyRoutine;
  Wednesday: DailyRoutine;
  Thursday: DailyRoutine;
  Friday: DailyRoutine;
  Saturday: DailyRoutine;
  Sunday: DailyRoutine;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const emptySlot: RoutineSlot = {
  startTime: "09:00",
  endTime: "17:00",
  maxAppointments: 10,
};

const emptyDailyRoutine: DailyRoutine = {
  isAvailable: false,
  slots: [{ ...emptySlot }],
};

const emptyWeeklyRoutine: WeeklyRoutine = {
  Monday: { ...emptyDailyRoutine },
  Tuesday: { ...emptyDailyRoutine },
  Wednesday: { ...emptyDailyRoutine },
  Thursday: { ...emptyDailyRoutine },
  Friday: { ...emptyDailyRoutine },
  Saturday: { ...emptyDailyRoutine },
  Sunday: { ...emptyDailyRoutine },
};

export function RoutineManagementPanel() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [routine, setRoutine] = useState<WeeklyRoutine>(emptyWeeklyRoutine);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeDay, setActiveDay] = useState("Monday");

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locationsList: Location[] = [];
        querySnapshot.forEach((doc) => {
          locationsList.push({ id: doc.id, name: doc.data().name });
        });
        setLocations(locationsList);
        
        if (locationsList.length > 0) {
          setSelectedLocation(locationsList[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to load locations");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Fetch routine when location changes
  useEffect(() => {
    if (!selectedLocation) return;
    
    const fetchRoutine = async () => {
      setLoading(true);
      try {
        const routineRef = doc(db, "routines", selectedLocation);
        const routineSnap = await getDoc(routineRef);
        
        if (routineSnap.exists()) {
          setRoutine(routineSnap.data() as WeeklyRoutine);
        } else {
          // If no routine exists, use the empty template
          setRoutine(emptyWeeklyRoutine);
        }
      } catch (error) {
        console.error("Error fetching routine:", error);
        toast.error("Failed to load routine");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [selectedLocation]);

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  const toggleDayAvailability = (day: keyof WeeklyRoutine) => {
    setRoutine(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable
      }
    }));
  };

  const updateSlot = (day: keyof WeeklyRoutine, index: number, field: keyof RoutineSlot, value: string | number) => {
    setRoutine(prev => {
      const updatedSlots = [...prev[day].slots];
      updatedSlots[index] = {
        ...updatedSlots[index],
        [field]: value
      };
      
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: updatedSlots
        }
      };
    });
  };

  const addSlot = (day: keyof WeeklyRoutine) => {
    setRoutine(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { ...emptySlot }]
      }
    }));
  };

  const removeSlot = (day: keyof WeeklyRoutine, index: number) => {
    if (routine[day].slots.length <= 1) return;
    
    setRoutine(prev => {
      const updatedSlots = prev[day].slots.filter((_, i) => i !== index);
      
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: updatedSlots
        }
      };
    });
  };

  const saveRoutine = async () => {
    if (!selectedLocation) return;
    
    setSaving(true);
    try {
      await setDoc(doc(db, "routines", selectedLocation), routine);
      toast.success("Routine updated successfully");
    } catch (error) {
      console.error("Error saving routine:", error);
      toast.error("Failed to save routine");
    } finally {
      setSaving(false);
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
          <CardTitle>Routine Management</CardTitle>
          <CardDescription>
            Set the doctor's weekly routine for each location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location-select">Select Location</Label>
              <Select
                value={selectedLocation}
                onValueChange={handleLocationChange}
                disabled={locations.length === 0}
              >
                <SelectTrigger id="location-select" className="w-full md:w-1/2">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-eyepurple" />
              </div>
            ) : selectedLocation ? (
              <div className="space-y-6">
                <Tabs value={activeDay} onValueChange={setActiveDay}>
                  <TabsList className="mb-6 flex overflow-x-auto space-x-1">
                    {daysOfWeek.map((day) => (
                      <TabsTrigger key={day} value={day} className="flex-shrink-0">
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {daysOfWeek.map((day) => (
                    <TabsContent key={day} value={day} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{day}'s Schedule</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Available</span>
                          <Button
                            type="button"
                            variant={routine[day as keyof WeeklyRoutine].isAvailable ? "default" : "outline"}
                            className={`h-8 ${
                              routine[day as keyof WeeklyRoutine].isAvailable
                                ? "bg-eyepurple hover:bg-eyepurple/90"
                                : ""
                            }`}
                            onClick={() => toggleDayAvailability(day as keyof WeeklyRoutine)}
                          >
                            {routine[day as keyof WeeklyRoutine].isAvailable ? "Yes" : "No"}
                          </Button>
                        </div>
                      </div>

                      {routine[day as keyof WeeklyRoutine].isAvailable && (
                        <div className="space-y-4">
                          <div className="bg-muted/50 rounded-md p-4">
                            <div className="grid grid-cols-12 gap-4 mb-2 font-medium text-sm">
                              <div className="col-span-5 md:col-span-4">Start Time</div>
                              <div className="col-span-5 md:col-span-4">End Time</div>
                              <div className="col-span-2 md:col-span-3">Max Appointments</div>
                              <div className="col-span-1"></div>
                            </div>
                            {routine[day as keyof WeeklyRoutine].slots.map((slot, index) => (
                              <div key={index} className="grid grid-cols-12 gap-4 mb-3">
                                <div className="col-span-5 md:col-span-4">
                                  <Input
                                    type="time"
                                    value={slot.startTime}
                                    onChange={(e) =>
                                      updateSlot(day as keyof WeeklyRoutine, index, "startTime", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-span-5 md:col-span-4">
                                  <Input
                                    type="time"
                                    value={slot.endTime}
                                    onChange={(e) =>
                                      updateSlot(day as keyof WeeklyRoutine, index, "endTime", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-span-2 md:col-span-3">
                                  <Input
                                    type="number"
                                    min="1"
                                    value={slot.maxAppointments}
                                    onChange={(e) =>
                                      updateSlot(
                                        day as keyof WeeklyRoutine,
                                        index,
                                        "maxAppointments",
                                        parseInt(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-span-12 md:col-span-1 flex justify-end">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSlot(day as keyof WeeklyRoutine, index)}
                                    disabled={routine[day as keyof WeeklyRoutine].slots.length <= 1}
                                    className="h-10 px-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addSlot(day as keyof WeeklyRoutine)}
                              className="mt-2"
                            >
                              Add Time Slot
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="flex justify-end">
                  <Button
                    onClick={saveRoutine}
                    disabled={saving}
                    className="bg-eyepurple hover:bg-eyepurple/90"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Routine
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                <h3 className="text-lg font-medium mb-2">No Locations Available</h3>
                <p className="text-muted-foreground mb-4">
                  You need to add at least one chamber location before you can set up routines.
                </p>
                <Button variant="outline" onClick={() => window.location.href = '#add-location'}>
                  Add Location First
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
