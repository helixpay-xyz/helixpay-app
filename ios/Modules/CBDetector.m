#import "CBDetector.h"

@implementation CBDetector

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"CBDetectorEvent"];
}

RCT_EXPORT_METHOD(startScreenshot)
{
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    [center addObserver:self
               selector:@selector(sendScreenshotNotify:)
                   name:UIApplicationUserDidTakeScreenshotNotification
                 object:nil];
}

RCT_EXPORT_METHOD(stopScreenshot)
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)sendScreenshotNotify:(NSNotification *)notification {
    NSDictionary *params = @{
            @"type": @"screenshot"
    };

    [self sendEventWithName:@"CBDetectorEvent" body:params];
}

@end
