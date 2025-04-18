
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

const doctorInfoSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  title: z.string().min(2, { message: "Title is required" }),
  qualifications: z.string().min(2, { message: "Qualifications are required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  specialization: z.string().min(2, { message: "Specialization is required" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  quote: z.string().optional(),
});

type DoctorInfoValues = z.infer<typeof doctorInfoSchema>;

export function DoctorInfoPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const form = useForm<DoctorInfoValues>({
    resolver: zodResolver(doctorInfoSchema),
    defaultValues: {
      name: "",
      title: "",
      qualifications: "",
      experience: "",
      specialization: "",
      bio: "",
      quote: "",
    },
  });

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const docRef = doc(db, "doctor", "profile");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as DoctorInfoValues;
          form.reset(data);
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
        toast.error("Failed to load doctor information");
      } finally {
        setIsFetching(false);
      }
    };

    fetchDoctorInfo();
  }, [form]);

  const onSubmit = async (data: DoctorInfoValues) => {
    setIsLoading(true);
    try {
      await setDoc(doc(db, "doctor", "profile"), data);
      toast.success("Doctor information updated successfully");
    } catch (error) {
      console.error("Error updating doctor info:", error);
      toast.error("Failed to update doctor information");
    } finally {
      setIsLoading(false);
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
          <CardTitle>Doctor Information</CardTitle>
          <CardDescription>
            Update Dr. Puspendu Maity's profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-eyepurple" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Ophthalmologist" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="qualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qualifications</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. MBBS, MS (Ophthalmology)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cataract Surgery, Glaucoma Treatment" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Biography</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write doctor's detailed biography here..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="quote"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Personal Quote (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A personal quote or mission statement..." 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
