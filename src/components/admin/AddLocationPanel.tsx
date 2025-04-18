
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc } from "firebase/firestore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, Plus } from "lucide-react";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const locationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
  hours: z.array(
    z.object({
      day: z.string(),
      time: z.string(),
    })
  ).optional(),
});

type LocationFormValues = z.infer<typeof locationSchema>;

export function AddLocationPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [hours, setHours] = useState(
    daysOfWeek.map((day) => ({
      day,
      time: "Closed",
    }))
  );

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const onSubmit = async (values: LocationFormValues) => {
    setIsLoading(true);
    try {
      const locationData = {
        ...values,
        hours,
      };

      await addDoc(collection(db, "locations"), locationData);
      toast.success("New location added successfully");
      
      // Reset form
      form.reset();
      setHours(daysOfWeek.map((day) => ({
        day,
        time: "Closed",
      })));
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add new location");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHourChange = (index: number, value: string) => {
    const updatedHours = [...hours];
    updatedHours[index].time = value;
    setHours(updatedHours);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Add New Chamber Location</CardTitle>
          <CardDescription>
            Create a new location for Dr. Puspendu Maity's chamber
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Sudipa Netralaya Main Clinic" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Full address" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Operating Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hours.map((hour, index) => (
                    <div key={index} className="space-y-2">
                      <FormLabel htmlFor={`hour-${index}`}>{hour.day}</FormLabel>
                      <Input
                        id={`hour-${index}`}
                        placeholder="9:00 AM - 5:00 PM or Closed"
                        value={hour.time}
                        onChange={(e) => handleHourChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-eyepurple hover:bg-eyepurple/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Location
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
