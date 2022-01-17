// RCTCalendarModule.m
#import "RCTCalendarModule.h"
#import "SkeduloCodePush-Swift.h"

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(exit)
{
    [SwiftPluginCall exit];
}

RCT_EXPORT_METHOD(increaseNativeCount)
{
    [SwiftPluginCall increaseNativeCount];
}

RCT_EXPORT_METHOD(callback:(NSString *) data)
{
    [SwiftPluginCall callbackWithData:data];
}

@end
